const SearchContractBar = ({
  contractAddy,
  setContractAddy,
  network,
  setNetwork,
}) => {

  const updateAddy = (e) => {
    if (e.key === 'Enter') {

    }
  }
  return (
    <div className="search-bar">
      <div className="left-align" style={{ display: "flex", gap: "8px" }}>
        <span>Contract address: </span>
        <input
          autoFocus="autofocus"
          className="search-input"
          value={contractAddy}
          onChange={(e) => setContractAddy(e.target.value)}
          placeholder="search any contract address"
        ></input>
      </div>
      <div className="left-align"  style={{ display: "flex", gap: "8px" }}>
        <span>Network:</span>
        <select value={network} onChange={(e) => setNetwork(e.target.value)}>
          <option value="mainnet">Mainnet</option>
          <option value="goerli">Goerli</option>
          <option value="kovan">Kovan</option>
          <option value="rinkeby">Rinkeby</option>
          {/* <option value="ropsten">Ropsten</option> */}
        </select>
      </div>
    </div>
  );
};

export default SearchContractBar;
