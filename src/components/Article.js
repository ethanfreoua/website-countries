const Article = ({ article }) => {
  const dateFormater = (date) => {
    let newDate = new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    return newDate;
  };

  return (
    <div className="article">
      <div className="card-header">
        <h3>{article.author}</h3>
        <em>Posted at {dateFormater(article.date)}</em>
      </div>
      <p>{article.content}</p>
      <div className="btn-container">
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default Article;
