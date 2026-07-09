const esbuild = require('esbuild');
const licensePlugin = require('esbuild-plugin-license').default;
const path = require('path');

esbuild.build({
  entryPoints: ['lib/setup-genesyscloud-archy.js'], 
  bundle: true,
  platform: 'node',
  target: 'node20',
  outfile: 'dist/index.js', 
  sourcemap: true,
  plugins: [
    licensePlugin({
      thirdParty: {
        includePrivate: false,
        output: {
          file: path.join(__dirname, 'dist', 'licenses.txt'),
          template(dependencies) {
            return dependencies
              .map((dep) => {
                const pkg = dep.packageJson;
                return `========================================================================\n` +
                       `${pkg.name} v${pkg.version} (${pkg.license || 'Unknown'})\n` +
                       `========================================================================\n\n` +
                       `${dep.licenseText || 'No license text found.'}\n`;
              })
              .join('\n\n');
          },
        },
      },
    }),
  ],
}).catch(() => process.exit(1));
