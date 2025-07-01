import "./style.css";
export default function RowComponent(props) {
  return (
    <>
      <tr>
        {
          <>
            <td>{props.data.name}</td>
            <td>{props.data.main.temp_min}</td>
            <td>{props.data.weather[0].description}</td>
          </>
        }
      </tr>
    </>
  );
}
