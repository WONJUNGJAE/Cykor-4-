import React, { useState } from 'react';

export default function Cykorlogin({ login, input }) {
  const [form, setForm] = useState({ username: '', password: '' });

  function inp(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function lgn(e) {
    e.preventDefault();
    login(form);
  }

  return (
    <form onSubmit={lgn}>
      <input name="username" value={form.username} onChange={inp} placeholder="아이디" />
      <input name="password" type="password" value={form.password} onChange={inp} placeholder="비밀번호" />
      <button type="submit">로그인</button>
    </form>
  );
}
