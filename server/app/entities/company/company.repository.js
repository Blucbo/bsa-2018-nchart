const generalRepository = require("../generalRepository");
const companyModel = require("../../models/company/company");

class CompanyRepository extends generalRepository {
  constructor() {
    super();
    this.model = companyModel;
  }

  save(obj, callback) {
    if (obj.company) {
      companyModel
        .create({
          name: obj.company
        })
        .then(data => {
          callback(null, data.dataValues);
        })
        .catch(err => callback(err, obj));
    } else {
      companyModel
        .create({
          name: `${obj.user.first_name} ${obj.user.last_name}`
        })
        .then(data => {
          callback(null, data.dataValues);
        })
        .catch(err => callback(err, obj));
    }
  }
}

module.exports = new CompanyRepository();
