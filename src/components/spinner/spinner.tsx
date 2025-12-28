function Spinner(): JSX.Element {
  return (
    <div
      data-testid="spinner"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div>Loading...</div>
    </div>
  );
}

export default Spinner;
