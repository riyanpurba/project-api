class User {
  constructor(id, firstName, lastName, email, password, roleId, status, createdAt, updatedAt, deletedAt) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.password = password;
      this.roleId = roleId;
      this.status = status;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.deletedAt = deletedAt;
  }
}

module.exports = User;