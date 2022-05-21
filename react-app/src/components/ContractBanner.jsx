import { getAddyShorthand } from "../util/interact.js";

const ContractBanner = ({ name, description, address, website, docs }) => {
  return (
    <div className="contract-banner">
      {/* TODO: consider adding metrics that indicate popularity of this contract # page views, # func calls, etc, and token tracker */}
      <div className="eight-hundo">

      <h2 >
        <a  href={`https://etherscan.io/address/${address}`} target="_blank">
          {name ? `${name}` : `Contract`} {`(${getAddyShorthand(address)})`}
        </a>
      </h2>
      <p>{description ? description : "No description found."}</p>
      <div
        className="tiny-text"
        style={{
          textTransform: "uppercase",
          fontWeight: "bold",
          right: "auto",
        }}
      >
        <div style={{ display: "flex" }}>
          <div><a href={website}>🔗 Website</a></div>
          <div><a href={docs}>📄 Docs</a></div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ContractBanner;
