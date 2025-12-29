type ErrorMessageProps = {
  message?: string;
};

function ErrorMessage({ message = 'Failed to load data. Please try again later.' }: ErrorMessageProps): JSX.Element {
  return (
    <div style={{
      padding: '20px',
      margin: '20px',
      backgroundColor: '#ffebee',
      border: '1px solid #ef5350',
      borderRadius: '4px',
      color: '#c62828',
      textAlign: 'center'
    }}
    >
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;
