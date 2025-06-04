import React, { useState } from 'react';

export default function Cykorreg({ reg, input }) {
  const [form, setForm] = useState({ username: '', password: '' });

  function inp(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function rg(e) {
    e.preventDefault();
    reg(form);
  }

  return (
    <form onSubmit={rg}>
      <input name="username" value={form.username} onChange={inp} placeholder="아이디" />
      <input name="password" type="password" value={form.password} onChange={inp} placeholder="비밀번호" />
      <button type="submit">회원가입</button>
    </form>
  );
}
