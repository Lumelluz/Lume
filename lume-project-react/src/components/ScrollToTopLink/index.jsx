import { Link as RouterLink } from 'react-router-dom';

const ScrollToTopLink = (props) => {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return <RouterLink {...props} onClick={handleClick} />;
};

export default ScrollToTopLink;
