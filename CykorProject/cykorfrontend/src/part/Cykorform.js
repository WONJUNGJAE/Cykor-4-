import React from 'react';

export default function Cykorform({ form, save, input, editId }) {
  return (
    <form onSubmit={save}>
      <input name="title" value={form.title} onChange={input} placeholder="제목" />
      <input name="content" value={form.content} onChange={input} placeholder="내용" />
      <button type="submit">{editId ? '수정' : '작성'}</button>
    </form>
  );
}
