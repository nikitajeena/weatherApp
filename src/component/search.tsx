export default function SearchInput(props) {
  const { handleSearch, handleKeyDown, value, placeholder } = props;
  return (
    <>
      <input
        onChange={handleSearch}
        onBlur={() => {}}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        value={value}
      />
    </>
  );
}
