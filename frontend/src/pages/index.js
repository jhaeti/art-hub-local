import { useEffect } from "react";
import { connect } from "react-redux";

import { loadUser } from "../redux/actions/userAction";

import useFetch from "../hooks/useFetch";

const Index = () => {
    return (
        <div
            style={{
                width: "100%",
                height: "80vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <h1 style={{ margin: "3rem" }}>Hello from local-art-hub</h1>

            <h2 style={{ display: "block" }}>Opening soon...</h2>
        </div>
    );
};

const mapDispatchToProps = { loadUser };

export default connect(null, mapDispatchToProps)(Index);
