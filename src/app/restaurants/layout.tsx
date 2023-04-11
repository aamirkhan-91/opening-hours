const RestaurantLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => (
  <section className='flex flex-grow flex-col items-center bg-content-light p-4 transition-colors dark:bg-content-dark'>
    {children}
  </section>
);

export default RestaurantLayout;
