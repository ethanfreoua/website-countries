import { useEffect, useState } from "react";
import axios from "axios";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import Article from "../components/Article";

const Blog = () => {
  const [blogData, setBlogData] = useState([]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(false);

  const getData = () => {
    axios
      .get("http://localhost:3004/articles")
      .then((res) => setBlogData(res.data));
  };

  useEffect(() => getData(), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.length < 140) {
      setError(true);
    } else {
      axios.post("http://localhost:3004/articles", {
        author,
        content,
        date: Date.now(),
      });
      setAuthor("");
      setContent("");
      getData();
    }
  };

  const changeContent = (e) => {
    setContent(e.target.value);
  };

  return (
    <div className="blog-container">
      <Logo />
      <Navigation />
      <h1>Blog</h1>

      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setAuthor(e.target.value)}
          value={author}
        />
        <textarea
          style={{ border: error && "1px solid red" }}
          placeholder="Message"
          onChange={changeContent}
          value={content}
        ></textarea>
        {error && <p>Need more than 140 characters</p>}
        <span id="char_count">{content.length + "/140"}</span>
        <input type="submit" value="Send" />
      </form>

      <ul>
        {blogData
          .sort((a, b) => b.date - a.date)
          .map((article) => {
            return <Article key={article.id} article={article} />;
          })}
      </ul>
    </div>
  );
};

export default Blog;
