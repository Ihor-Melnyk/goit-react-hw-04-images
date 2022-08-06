import PropTypes from 'prop-types';
import '../../styles.css';

const Button = ({ btnClick }) => {
  return (
    <button className={'Button'} type="button" onClick={btnClick}>
      Load more
    </button>
  );
};

export default Button;

Button.propTypes = { onClick: PropTypes.func };
