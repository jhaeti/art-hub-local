import styles from "../styles.module.css";
const productsTable = ({ products }) => {
  return (
    <table className={styles.table}>
      <thead>
        <th>
          <td>ID</td>
        </th>
        <th>
          <td>Product Name</td>
        </th>
        <th>
          <td>Sold</td>
        </th>
        <th>
          <td>Date</td>
        </th>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr>
            <td>{product._id.slice(0, 10)}</td>
            <td>{product.name}</td>
            <td>{product.ns}</td>
            <td>{new Date(product.date).toISOString().split("T")[0]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default productsTable;
