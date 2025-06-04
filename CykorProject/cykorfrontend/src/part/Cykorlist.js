import React from 'react';

export default function Cykorlist({ posts, edit, del }) {
  return (
    <ul>
      {posts.map(post => (
        <li key={post._id}>
          <strong>{post.title}</strong> - {post.content}
          {post.author?.username && <span> (작성자: {post.author.username})</span>}
          <button onClick={() => edit(post)}>수정</button>
          <button onClick={() => del(post._id)}>삭제</button>
        </li>
      ))}
    </ul>
  );
}
