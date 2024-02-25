import clsx from 'clsx';

const GlassContainer = ({ children, className }) => {
  return (
    <div
      className={clsx('rounded-3xl glass border-2  border-gray-200', className)}
    >
      {children}
    </div>
  );
};
export default GlassContainer;
