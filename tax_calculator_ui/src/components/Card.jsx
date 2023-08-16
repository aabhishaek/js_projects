import './Card.css'

function Card(props) {
  const { children, className } = props || {};

  const classes = 'card ' + className

  return <section className={classes}>{children}</section>;
}

export default Card;
