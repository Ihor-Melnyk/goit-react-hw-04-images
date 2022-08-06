import { Bars } from 'react-loader-spinner';
import PropTypes from 'prop-types';
import '../../styles.css';

const Loader = imageName => (
  <div className={'Loader'}>
    <Bars color="#00BFFF" height={80} width={80} />
    <h2> Loading...</h2>
  </div>
);

export default Loader;

Loader.propTypes = { imageName: PropTypes.string.isRequired };
