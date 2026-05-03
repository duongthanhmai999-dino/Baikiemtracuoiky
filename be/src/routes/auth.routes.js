import { Router } from "express";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";

import { readUsers, writeUsers } from "../store/usersJsonStore.js";

const router = Router();

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

router.post("/register", async (req, res) => {
  try {
    const { role, name, email, password, phone } = req.body || {};

    const roleNormalized =
      role === "artist" || role === "listener" ? role : "listener";

    const nameTrimmed = String(name || "").trim();
    const emailNorm = normalizeEmail(email);
    const phoneTrimmed = phone ? String(phone).trim() : "";

    if (!nameTrimmed || nameTrimmed.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Tên phải có ít nhất 2 ký tự.",
      });
    }

    if (!emailNorm) {
      return res.status(400).json({ success: false, message: "Email không hợp lệ." });
    }

    if (!password || String(password).length < 6) {
      return res.status(400).json({
        success: false,
        message: "Mật khẩu phải có ít nhất 6 ký tự.",
      });
    }

    const users = readUsers();
    const exists = users.some((u) => u.email === emailNorm);
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Email này đã được đăng ký. Vui lòng đăng nhập.",
      });
    }

    const passwordHash = await bcrypt.hash(String(password), 10);

    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    users.push({
      id,
      role: roleNormalized,
      name: nameTrimmed,
      email: emailNorm,
      password_hash: passwordHash,
      phone: phoneTrimmed,
      created_at: createdAt,
    });
    writeUsers(users);

    return res.json({
      success: true,
      message: "Đăng ký thành công! Chuyển đến trang đăng nhập...",
    });
  } catch (err) {
    throw err;
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    const emailNorm = normalizeEmail(email);

    if (!emailNorm || !password) {
      return res.status(400).json({
        success: false,
        message: "Email hoặc mật khẩu không đúng.",
      });
    }

    const users = readUsers();
    const userRow = users.find((u) => u.email === emailNorm);

    if (!userRow) {
      return res.status(401).json({
        success: false,
        message: "Email hoặc mật khẩu không đúng.",
      });
    }

    const ok = await bcrypt.compare(String(password), userRow.password_hash);
    if (!ok) {
      return res.status(401).json({
        success: false,
        message: "Email hoặc mật khẩu không đúng.",
      });
    }

    const { id, role, name, email: userEmail, phone } = userRow;

    return res.json({
      success: true,
      user: { id, role, name, email: userEmail, phone },
    });
  } catch (err) {
    throw err;
  }
});

export default router;
