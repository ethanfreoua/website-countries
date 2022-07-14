const Card = ({ name, flag, capital, population }) => {
  return (
    <li className="card">
      <img src={flag} alt={name} />
      <div className="infos">
        <h2>{name}</h2>
        <h4> Capital : {capital}</h4>
        <p>Pop : {population.toLocaleString()}</p>
      </div>
    </li>
  );
};

export default Card;
