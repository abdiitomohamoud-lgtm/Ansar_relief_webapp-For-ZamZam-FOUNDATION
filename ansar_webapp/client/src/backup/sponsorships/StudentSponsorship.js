{
  "name": "postcss-calc",
  "version": "8.2.4",
  "description": "PostCSS plugin to reduce calc()",
  "keywords": [
    "css",
    "postcss",
    "postcss-plugin",
    "calculation",
    "calc"
  ],
  "main": "src/index.js",
  "types": "types/index.d.ts",
  "files": [
    "src",
    "types",
    "LICENSE"
  ],
  "author": "Andy Jansson",
  "license": "MIT",
  "repository": "https://github.com/postcss/postcss-calc.git",
  "eslintConfig": {
    "extends": [
      "eslint:recommended",
      "prettier"
    ],
    "env": {
      "node": true,
      "es2017": true
    },
    "ignorePatterns": [
      "src/parser.js"
    ],
    "rules": {
      "curly": "error"
    }
  },
  "devDependencies": {
    "@types/node": "^17.0.15",
    "eslint": "^8.8.0",
    "eslint-config-prettier": "^8.3.0",
    "jison-gho": "^0.6.1-216",
    "postcss": "^8.2.2",
    "prettier": "^2.5.1",
    "typescript": "^4.5.5",
    "uvu": "^0.5.3"
  },
  "dependencies": {
    "postcss-selector-parser": "^6.0.9",
    "postcss-value-parser": "^4.2.0"
  },
  "peerDependencies": {
    "postcss": "^8.2.2"
  },
  "scripts": {
    "build": "jison src/parser.jison -o src/parser.js",
    "lint": "eslint src && tsc",
    "pretest": "pnpm run build",
    "test": "uvu src/__tests__"
  },
  "readme": "# PostCSS Calc [<img src=\"https://postcss.github.io/postcss/logo.svg\" alt=\"PostCSS\" width=\"90\" height=\"90\" align=\"right\">][PostCSS]\n\n[![NPM Version][npm-img]][npm-url]\n[![Support Chat][git-img]][git-url]\n\n[PostCSS Calc] lets you reduce `calc()` references whenever it's possible.\nWhen multiple units are mixed together in the same expression, the `calc()`\nstatement is left as is, to fallback to the [W3C calc() implementation].\n\n## Installation\n\n```bash\nnpm install postcss-calc\n```\n\n## Usage\n\n```js\n// dependencies\nvar fs = require(\"fs\")\nvar postcss = require(\"postcss\")\nvar calc = require(\"postcss-calc\")\n\n// css to be processed\nvar css = fs.readFileSync(\"input.css\", \"utf8\")\n\n// process css\nvar output = postcss()\n  .use(calc())\n  .process(css)\n  .css\n```\n\nUsing this `input.css`:\n\n```css\nh1 {\n  font-size: calc(16px * 2);\n  height: calc(100px - 2em);\n  width: calc(2*var(--base-width));\n  margin-bottom: calc(16px * 1.5);\n}\n```\n\nyou will get:\n\n```css\nh1 {\n  font-size: 32px;\n  height: calc(100px - 2em);\n  width: calc(2*var(--base-width));\n  margin-bottom: 24px\n}\n```\nCheckout [tests] for more examples.\n\n### Options\n\n#### `precision` (default: `5`)\n\nAllow you to define the precision for decimal numbers.\n\n```js\nvar out = postcss()\n  .use(calc({precision: 10}))\n  .process(css)\n  .css\n```\n\n#### `preserve` (default: `false`)\n\nAllow you to preserve calc() usage in output so browsers will handle decimal\nprecision themselves.\n\n```js\nvar out = postcss()\n  .use(calc({preserve: true}))\n  .process(css)\n  .css\n```\n\n#### `warnWhenCannotResolve` (default: `false`)\n\nAdds warnings when calc() are not reduced to a single value.\n\n```js\nvar out = postcss()\n  .use(calc({warnWhenCannotResolve: true}))\n  .process(css)\n  .css\n```\n\n#### `mediaQueries` (default: `false`)\n\nAllows calc() usage as part of media query declarations.\n\n```js\nvar out = postcss()\n  .use(calc({mediaQueries: true}))\n  .process(css)\n  .css\n```\n\n#### `selectors` (default: `false`)\n\nAllows calc() usage as part of selectors.\n\n```js\nvar out = postcss()\n  .use(calc({selectors: true}))\n  .process(css)\n  .css\n```\n\nExample:\n\n```css\ndiv[data-size=\"calc(3*3)\"] {\n  width: 100px;\n}\n```\n\n---\n\n## Related PostCSS plugins\nTo replace the value of CSS custom properties at build time, try [PostCSS Custom Properties].\n\n## Contributing\n\nWork on a branch, install dev-dependencies, respect coding style & run tests\nbefore submitting a bug fix or a feature.\n\n```bash\ngit clone git@github.com:postcss/postcss-calc.git\ngit checkout -b patch-1\nnpm install\nnpm test\n```\n\n## [Changelog](CHANGELOG.md)\n\n## [License](LICENSE)\n\n[git-img]: https://img.shields.io/badge/support-chat-blue.svg\n[git-url]: https://git       type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Amount
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">Select amount</option>
              <option value="75">$75</option>
              <option value="100">$100</option>
              <option value="150">$150</option>
              <option value="200">$200</option>
              <option value="250">$250</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message (Optional)
            </label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="4"
              placeholder="Add a personal message to your sponsored student"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Start Sponsoring
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentSponsorship; 