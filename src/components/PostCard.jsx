import '../styles/styles.css';

export default function PostCard({ post }) {
  return (
    <div className="post-card">
      <p>{post.content}</p>
      <div className="post-footer">
        <span>Postado por: Anônimo</span>
        <div className="actions">
          <button>Curtir</button>
          <button>💜</button>
        </div>
      </div>
    </div>
  );
}
