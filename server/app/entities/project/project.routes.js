const project = require('express').Router();
const ProjectService = require('../../entities/project/project.service');
const PayloadGeneratorService = require('../../common/services/payload-generator.service');

project.get('/', (req, res, next) => {
	ProjectService.getAll()
		.then(PayloadGeneratorService.nextWithData(next, res))
		.catch(next);
});

project.get('/:id/export', (req, res) => {
	ProjectService.export(req.params.id, req.query.type).then(result => {
		if (result) {
			res.writeHead(200, {
				'Content-Disposition': 'inline',
				'Content-Length': result.length,
				'Content-Type': `application/${req.query.type}`
			});
			res.end(result);
		} else {
			res.send(400);
		}
	});
});

module.exports = project;
