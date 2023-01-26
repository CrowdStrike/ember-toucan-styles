# `@crowdstrike/ember-toucan-styles`

## 2.0.0-beta.0

### Major Changes

- [#13](https://github.com/CrowdStrike/ember-toucan-styles/pull/13) [`ad21ab5`](https://github.com/CrowdStrike/ember-toucan-styles/commit/ad21ab56f9ad51b385d6616795aacfb1df7ff741) Thanks [@NullVoxPopuli](https://github.com/NullVoxPopuli)! - Drop support for Ember < 3.28.

  Add support for:

  - Ember 4.8
  - TypeScript 4.8
  - TypeScript 4.9

- [#13](https://github.com/CrowdStrike/ember-toucan-styles/pull/13) [`d2c4393`](https://github.com/CrowdStrike/ember-toucan-styles/commit/d2c4393114e8a479c4e94e0275232232e16842a6) Thanks [@NullVoxPopuli](https://github.com/NullVoxPopuli)! - (internal): swap semantic-release for Changesets so that we can have more granular control over releases, and batch breaking changes together without massive PRs

- [#12](https://github.com/CrowdStrike/ember-toucan-styles/pull/12) [`273c7d6`](https://github.com/CrowdStrike/ember-toucan-styles/commit/273c7d681658233554d4825f6dfbfa1c3c896353) Thanks [@NullVoxPopuli](https://github.com/NullVoxPopuli)! - This is a breaking change is it requires that consumers have a way to properly resolve side-affecting CSS imports
  (this is commonplace in many webpack and vite apps though).

  (ember-auto-import and embroider)-based ember apps support this out of the box.

  Here is a tutorial on setting up Tailwind 3 + JIT, CSS imports, and (optionally) CSS-Modules, for those interested https://discuss.emberjs.com/t/ember-modern-css/19614

  To migrate to this version of `@crowdstrike/ember-toucan-styles`, remove any previously referenced

  ```css
  @import "@crowdstrike/ember-toucan-styles/scollbar.css";
  ```

  in your CSS.

  This is now imported for you via the included service.

## [1.0.5](https://github.com/CrowdStrike/ember-toucan-styles/compare/v1.0.4...v1.0.5) (2022-07-10)

### Bug Fixes

- remove unneeded private file ([2b6cdf0](https://github.com/CrowdStrike/ember-toucan-styles/commit/2b6cdf0a5a5ec784917c4c0a0a2955e0c0b33918))
- **types:** typesVersions needs a .d.ts extension ([d72f787](https://github.com/CrowdStrike/ember-toucan-styles/commit/d72f78731d91b9ea4be43a39d7994828f3b848d9))

## [1.0.4](https://github.com/CrowdStrike/ember-toucan-styles/compare/v1.0.3...v1.0.4) (2022-07-02)

### Bug Fixes

- **utils:** add colors and themes utils ([5894120](https://github.com/CrowdStrike/ember-toucan-styles/commit/5894120019deca03b122e2ae0fb5f858788152b3))

## [1.0.3](https://github.com/CrowdStrike/ember-toucan-styles/compare/v1.0.2...v1.0.3) (2022-07-01)

### Bug Fixes

- **ember-cli:** compat with ember-cli requires postcss + postcss-import to be dependencies ([34e2474](https://github.com/CrowdStrike/ember-toucan-styles/commit/34e24745581e1cd1921a09094965bd7af9ac0178))

## [1.0.2](https://github.com/CrowdStrike/ember-toucan-styles/compare/v1.0.1...v1.0.2) (2022-06-30)

### Bug Fixes

- **license:** use MIT license ([e61600a](https://github.com/CrowdStrike/ember-toucan-styles/commit/e61600af0d6226752136f43eca9e3adab4def191))

## [1.0.1](https://github.com/CrowdStrike/ember-toucan-styles/compare/v1.0.0...v1.0.1) (2022-06-30)

### Bug Fixes

- **package:** set access to public to publish to npm ([a544d91](https://github.com/CrowdStrike/ember-toucan-styles/commit/a544d91fff3a5f2abe9c93978243f1f7efb8bd87))

# 1.0.0 (2022-06-30)

### Bug Fixes

- **deps:** add semantic-release dependencies to package ([879b45b](https://github.com/CrowdStrike/ember-toucan-styles/commit/879b45b1f3244dde8eafdb007370f76cfa579458))

### Features

- initial v2 addon implementation ([64328dc](https://github.com/CrowdStrike/ember-toucan-styles/commit/64328dce313ff60df062d6765d65aa4256dd9513))

### BREAKING CHANGES

- declare compatibility
  - ember-auto-import@v2+
  - typescript@4.5+
  - ember-source@3.24+
  - embroider maximum compatibility and strict mode
