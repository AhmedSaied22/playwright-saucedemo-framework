import * as allure from 'allure-js-commons';

export type AllureMetaOptions = {
  parentSuite?: string;
  suite?: string;
  subSuite?: string;
  feature?: string;
  story?: string;
  severity?: 'blocker' | 'critical' | 'normal' | 'minor' | 'trivial';
  tags?: string[];
  description?: string;
};

export async function setAllureMeta(options: AllureMetaOptions): Promise<void> {
  if (options.parentSuite) {
    await allure.parentSuite(options.parentSuite);
  }

  if (options.suite) {
    await allure.suite(options.suite);
  }

  if (options.subSuite) {
    await allure.subSuite(options.subSuite);
  }

  if (options.feature) {
    await allure.feature(options.feature);
  }

  if (options.story) {
    await allure.story(options.story);
  }

  if (options.severity) {
    await allure.severity(options.severity);
  }

  if (options.tags?.length) {
    await allure.tags(...options.tags);
  }

  if (options.description) {
    await allure.description(options.description);
  }
}