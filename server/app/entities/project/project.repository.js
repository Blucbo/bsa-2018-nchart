const Repository = require('../../common/repository/repository');
const projectModel = require('./project.models/project');
const projectChartModel = require('./project.models/project_chart');
const TransactionService = require('../../common/services/db-transaction.service');
const chartModel = require('../chart/chart.model');
const datasetModel = require('../dataset/dataset.model');
const groupModel = require('../group/group.models/group');
const groupProjectModel = require('../group/group.models/group_project');
const groupUserModel = require('../group/group.models/group_user');

class ProjectRepository extends Repository {
	constructor() {
		super();
		this.projectModel = projectModel;
		this.projectChartModel = projectChartModel;
		this.groupProjectModel = groupProjectModel;
	}

	upsert(obj) {
		return this.projectModel.upsert({ id: obj.id, name: obj.name });
	}

	create(name) {
		return this.projectModel.create({ name });
	}

	upsertProjectCharts(objs) {
		return TransactionService(objs, this.projectChartModel, 'upsert');
	}

	fullProjectById(id) {
		return this.projectModel.findOne({
			where: { id },
			attributes: ['id', 'name', 'createdAt'],
			include: [
				{
					model: projectChartModel,
					attributes: ['chartId'],
					include: [
						{
							model: chartModel,
							attributes: [
								'id',
								'chartTypeId',
								'datasetId',
								'dimensionSettings',
								'customizeSettings'
							],
							include: [
								{
									model: datasetModel,
									attributes: ['id', 'data', 'columns']
								}
							]
						}
					]
				}
			]
		});
	}

	fullProjectsByGroupId(id) {
		this.groupModel = groupModel;
		return this.groupModel.findOne({
			where: { id },
			attributes: ['id'],
			include: [
				{
					model: groupProjectModel,
					attributes: ['groupId', 'projectId'],
					include: [
						{
							model: this.projectModel,
							attributes: ['id', 'name', 'createdAt'],
							include: [
								{
									model: projectChartModel,
									attributes: ['chartId'],
									include: [
										{
											model: chartModel,
											attributes: [
												'id',
												'chartTypeId',
												'datasetId',
												'dimensionSettings',
												'customizeSettings'
											],
											include: [
												{
													model: datasetModel,
													attributes: [
														'id',
														'data',
														'columns'
													]
												}
											]
										}
									]
								}
							]
						}
					]
				}
			]
		});
	}

	fullProjectByUserId(id) {
		this.groupUser = groupUserModel;
		return this.groupUser.findAll({
			where: { userId: id },
			attributes: ['groupId'],
			include: [
				{
					model: groupModel,
					attributes: ['id'],
					include: [
						{
							model: groupProjectModel,
							separate: true,
							attributes: ['groupId', 'projectId'],
							include: [
								{
									model: this.projectModel,
									attributes: ['id', 'name', 'createdAt'],
									include: [
										{
											model: projectChartModel,
											separate: true,
											attributes: ['chartId'],
											include: [
												{
													model: chartModel,
													attributes: [
														'id',
														'chartTypeId',
														'datasetId',
														'dimensionSettings',
														'customizeSettings'
													],
													include: [
														{
															model: datasetModel,
															attributes: [
																'id',
																'data',
																'columns'
															]
														}
													]
												}
											]
										}
									]
								}
							]
						}
					]
				}
			]
		});
	}

	findByUserIdAndProjectId(obj) {
		return this.groupProjectModel.findOne({
			where: { projectId: obj.projectId },
			include: [
				{
					model: groupModel,
					include: [
						{
							model: groupUserModel,
							where: { userId: obj.userId }
						}
					]
				}
			]
		});
	}
}

module.exports = new ProjectRepository();
