const RestaurantLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => <section className='flex flex-grow flex-col items-center bg-grey-2 p-4'>{children}</section>;

export default RestaurantLayout;
