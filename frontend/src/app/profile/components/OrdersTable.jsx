import styles from "../styles.module.css";
const OrdersTable = ({ orders }) => {
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
          <td>Price / GHC</td>
        </th>
        <th>
          <td>Date</td>
        </th>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr>
            <td>{order._id.slice(0, 10)}</td>
            <td>{order.productName}</td>
            <td>{order.amount}</td>
            <td>{new Date(order.date).toISOString().split("T")[0]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrdersTable;
