export default class ContractFunctionObj {
  constructor(
    id,
    contractAddy,
    network,
    name,
    inputs,
    outputs,
    stateMutability,
    isRead
  ) {
    this.id = id;
    this.contractAddy = contractAddy;
    this.network = network;
    this.name = name;
    this.inputs = inputs;
    this.outputs = outputs;
    this.stateMutability = stateMutability;
    this.isRead = isRead;
  }

  parseInputs() {
    return this.inputs.values;
  }

  parseOutputsJSX() {
    if (!this.outputs || this.outputs.length === 0) {
      return <span style={{ fontStyle: "italic" }}>(none)</span>;
    } else {
      let str = "";

      this.outputs.map((out) => {
        str = str + ` ${out.type},`;
      });

      let result = str.slice(0, -1);
      if (result.charAt(0) === " ") {
        result = result.slice(1);
      }

      return <span style={{ fontStyle: "italic" }}>({result})</span>;
    }
  }
}
