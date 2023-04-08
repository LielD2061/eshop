import Spinner from "react-bootstrap/Spinner";

function Loading(params) {
  return (
    <Spinner animation='border' role='status'>
      <span className='visually-hidden'>Loading...</span>
    </Spinner>
  );
}

export default Loading;
