import MoneroError from "../../common/MoneroError";

/**
 * Defines the Monero and Dinastycoin network types.
 */
export default class MoneroNetworkType {

  /**
   * Monero Mainnet (value=0).
   */
  static readonly MAINNET = 0;

  /**
   * Monero Testnet (value=1).
   */
  static readonly TESTNET = 1;

  /**
   * Monero Stagenet (value=2).
   */
  static readonly STAGENET = 2;

  /**
   * Dinastycoin Mainnet (value=3).
   */
  static readonly DINASTYCOIN_MAINNET = 3;

  /**
   * Dinastycoin Testnet (value=4).
   */
  static readonly DINASTYCOIN_TESTNET = 4;

  /**
   * Validate and normalize the given network type.
   *
   * @param {MoneroNetworkType | number | string} networkType - the network type to validate and normalize
   * @return {MoneroNetworkType} the given network type
   */
  static from(networkType: MoneroNetworkType | number | string): MoneroNetworkType {
    if (typeof networkType === "string") return MoneroNetworkType.parse(networkType);
    MoneroNetworkType.validate(networkType);
    return networkType;
  }

  /**
   * Validate the given network type.
   *
   * @param {MoneroNetworkType} networkType - the network type to validate as a numeric
   */
  static validate(networkType: MoneroNetworkType | number | string) {
    if (typeof networkType === "string") MoneroNetworkType.parse(networkType);
    else if (networkType !== 0 && networkType !== 1 && networkType !== 2 && networkType !== 3 && networkType !== 4) {
      throw new MoneroError("Network type is invalid: " + networkType);
    }
  }

  /**
   * Indicates if the given network type is valid or not.
   *
   * @param {MoneroNetworkType | number} networkType - the network type to validate as a numeric
   * @return {boolean} true if the network type is valid, false otherwise
   */
  static isValid(networkType: MoneroNetworkType | number | string): boolean {
    try {
      MoneroNetworkType.validate(networkType);
      return true;
    } catch(err) {
      return false;
    }
  }

  /**
   * Parse the given string as a network type.
   *
   * @param {string} networkTypeStr - "mainnet", "testnet", "stagenet", "dinastycoin_mainnet", or "dinastycoin_testnet" (case insensitive)
   * @return {MoneroNetworkType} the network type as a numeric
   */
  static parse(networkTypeStr: string): MoneroNetworkType {
    let str = ("" + networkTypeStr).toLowerCase();
    switch (str) {
      case "mainnet": return MoneroNetworkType.MAINNET;
      case "testnet": return MoneroNetworkType.TESTNET;
      case "stagenet": return MoneroNetworkType.STAGENET;
      case "dinastycoin_mainnet": return MoneroNetworkType.DINASTYCOIN_MAINNET;
      case "dinastycoin_testnet": return MoneroNetworkType.DINASTYCOIN_TESTNET;
      default: throw new MoneroError("Invalid network type to parse: '" + networkTypeStr + "'");
    }
  }

  /**
   * Get the network type in human-readable form.
   *
   * @return {string} the network type in human-readable form
   */
  static toString(networkType: MoneroNetworkType | number): string {
    if (networkType === 0) return "mainnet";
    if (networkType === 1) return "testnet";
    if (networkType === 2) return "stagenet";
    if (networkType === 3) return "dinastycoin_mainnet";
    if (networkType === 4) return "dinastycoin_testnet";
    throw new MoneroError("Invalid network type: " + networkType);
  }
}
