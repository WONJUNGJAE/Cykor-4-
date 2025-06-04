import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cykorlist from './part/Cykorlist';
import Cykorform from './part/Cykorform';
import Cykorlogin from './part/Cykorlogin';
import Cykorreg from './part/Cykorreg';
import './App.css';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });
  const [editId, setEditId] = useState(null);
  const [user, setUser] = useState(null);
  const [showReg, setShowReg] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [regForm, setRegForm] = useState({ username: '', password: '' });

  function read() {
    axios.get('http://localhost:5000/api/cykor')
      .then(res => setPosts(res.data))
      .catch(err => console.error('글 목록 불러오기 실패:', err));
  }

  function check() {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:5000/api/user/me', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => setUser(res.data.username))
        .catch(() => localStorage.removeItem('token'));
    }
  }

  function input(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function save(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return alert('로그인 필요');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    if (editId) {
      axios.put(`http://localhost:5000/api/cykor/${editId}`, form, config)
        .then(() => {
          setEditId(null);
          setForm({ title: '', content: '' });
          read();
        })
        .catch(err => alert(err.response?.data?.message || '수정 실패'));
    } else {
      axios.post('http://localhost:5000/api/cykor', form, config)
        .then(() => {
          setForm({ title: '', content: '' });
          read();
        })
        .catch(err => alert(err.response?.data?.message || '작성 실패'));
    }
  }

  function edit(post) {
    setForm({ title: post.title, content: post.content });
    setEditId(post._id);
  }

  function del(id) {
    const token = localStorage.getItem('token');
    if (!token) return alert('로그인 필요');
    axios.delete(`http://localhost:5000/api/cykor/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => read())
      .catch(err => alert(err.response?.data?.message || '삭제 실패'));
  }

  function login(form) {
    axios.post('http://localhost:5000/api/user/login', form)
      .then(res => {
        localStorage.setItem('token', res.data.token);
        setUser(res.data.username);
        setShowReg(false);
      })
      .catch(err => alert(err.response?.data?.message || '로그인 실패'));
  }

  function reg(form) {
    axios.post('http://localhost:5000/api/user/reg', form)
      .then(() => {
        alert('회원가입 성공');
        setShowReg(false);
      })
      .catch(err => alert(err.response?.data?.message || '회원가입 실패'));
  }

  function logout() {
    localStorage.removeItem('token');
    setUser(null);
  }

  function inputLogin(e) {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  }

  function inputReg(e) {
    setRegForm({ ...regForm, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    read();
    check();
  }, []);

  return (
    <div className="App">
      <h1>Cykor 게시판</h1>
      {user ? (
        <>
          <div>환영합니다, {user}님! <button onClick={logout}>로그아웃</button></div>
          <Cykorform form={form} save={save} input={input} editId={editId} />
          <Cykorlist posts={posts} edit={edit} del={del} />
        </>
      ) : (
        <>
          {showReg ? (
            <Cykorreg reg={reg} input={inputReg} />
          ) : (
            <Cykorlogin login={login} input={inputLogin} />
          )}
          <button onClick={() => setShowReg(!showReg)}>
            {showReg ? '로그인' : '회원가입'}
          </button>
        </>
      )}
    </div>
  );
}
