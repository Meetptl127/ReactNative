export default class User {
  constructor(id, fullName, email) {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
  }

  // Convert a JSON object into a User instance
  static fromJson(json) {
    return new User(json.id, json.fullName, json.email);
  }

  // Convert User instance to JSON string for storage
  toJson() {
    return JSON.stringify({
      id: this.id,
      fullName: this.fullName,
      email: this.email,
    });
  }
}
