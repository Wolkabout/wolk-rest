/**
 * Defines all possible role types.
 */
enum RoleType {
  /**
   * Role defined by system that can not be modified.
   */
  SYSTEM = 'SYSTEM',

  /**
   * Role defined by user that can be modified.
   */
  USER = 'USER'
}

export default RoleType;
