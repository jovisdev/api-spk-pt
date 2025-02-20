import { query } from "../database/config.js"
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const getUsers = async(req,res) => {
    try {
        const result = await query("SELECT id, nama, jabatan FROM users WHERE jabatan <> 'Super Admin'");
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
}

export const register = async (req, res) => {
    const { nama, jabatan, username, password, confPassword } = req.body;
    if (password !== confPassword) return res.status(400).json({ msg: "Password and Confirm Password do not match" });

    const salt = await bcryptjs.genSalt();
    const hashPassword = await bcryptjs.hash(password, salt);

    const insertUserQuery = `
        INSERT INTO users (nama, jabatan, username, password)
        VALUES (?, ?, ?, ?);
    `;

    try {
        await query(insertUserQuery, [nama, jabatan, username, hashPassword]);
        res.json({ msg: "Registration Successful" });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body;

    const findUserQuery = `
        SELECT * FROM users WHERE username = ?;
    `;

    const updateUserTokenQuery = `
        UPDATE users SET refresh_token = ? WHERE id = ?;
    `;

    try {
        const [user] = await query(findUserQuery, [username]);

        if (!user) return res.status(404).json({ msg: "user not found" });

        const match = await bcryptjs.compare(password, user.password);
        if (!match) return res.status(400).json({ msg: "Wrong Password" });

        const userId = user.id;
        const name = user.nama;
        const jabatan = user.jabatan;

        const accessToken = jwt.sign({ userId, name, jabatan }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
        });

        const refreshToken = jwt.sign({ userId, name, jabatan }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });

        await query(updateUserTokenQuery, [refreshToken, userId]);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        res.json({ accessToken, name, jabatan, userId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

export const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);

    const findUserByTokenQuery = `
        SELECT * FROM users WHERE refresh_token = ?;
    `;

    const [user] = await query(findUserByTokenQuery, [refreshToken]);

    if (!user) return res.sendStatus(204);

    const userId = user.id;

    const updateUserTokenQuery = `
        UPDATE users SET refresh_token = NULL WHERE id = ?;
    `;

    try {
        await query(updateUserTokenQuery, [userId]);
        res.clearCookie('refreshToken');
        return res.sendStatus(200);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};

// hapus users
export const deleteUser = async (req, res) => {
    const { userId } = req.params; // ID dari kriteria yang ingin dihapus

    const getUserQuery = `SELECT nama FROM users WHERE id = ?`;

    const deleteUserQuery = `DELETE FROM users WHERE id = ?`;

    try {
        // Ambil nama alternatif terlebih dahulu
        const [users] = await query(getUserQuery, userId);

        // Hapus kriteria
        await query(deleteUserQuery, userId);

        // Kirim respons sukses dengan nama kriteria
        res.status(200).json({message: `User atas nama ${users.nama} berhasil dihapus.`});
    } catch (error) {
        console.error('Error:', error); // Log kesalahan untuk debugging
        res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
    }
};