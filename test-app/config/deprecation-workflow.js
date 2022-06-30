'use strict';

self.deprecationWorkflow = self.deprecationWorkflow || {};
self.deprecationWorkflow.config = {
  // eagerly throw on deprecations to prevent introducing
  // warnings to upstream consumers
  throwOnUnhandled: true,

  workflow: [],
};
