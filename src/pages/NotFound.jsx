import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';

export default function NotFound() {
  return (
    <>
      <PageMeta title="Page Not Found" description="The page you are looking for does not exist." path="/404" />
      <div className="container not-found">
        <h1>404</h1>
        <p>Sorry, the page you are looking for does not exist or may have been moved.</p>
        <Link to="/" className="btn btn--primary">Back to Home</Link>
      </div>
    </>
  );
}
