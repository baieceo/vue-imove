/* eslint-disable no-useless-escape */
import axios from 'axios';
import { safeGet } from './index';
import { getLocalConfig } from '../api';

const regex =
    /import\s([\s\S]*?)\sfrom\s('|")((@\w[\w\.\-]+\/)?(\w[\w\.\-]+))(\/[\w\.\-]+)*\2/gm;

const extractPkgs = (code, excludePkgs) => {
    let matchRet = null;
    const pkgNames = [];
    while ((matchRet = regex.exec(code)) != null) {
        const pkgName = matchRet[3];
        if (excludePkgs && excludePkgs.indexOf(pkgName) === -1) {
            pkgNames.push(pkgName);
        }
    }
    return pkgNames;
};

const getPkgLatestVersion = (pkg) => {
    const localConfig = getLocalConfig();
    return axios
        .get(`${localConfig.npmRegistry}/${pkg}`)
        .then((res) => {
            return [pkg, safeGet(res, 'data.dist-tags.latest', '*')];
        })
        .catch((err) => {
            console.log(`get package ${pkg} info failed, the error is:`, err);
            return [pkg, '*'];
        });
};

const analyzeDeps = (code, excludePkgs) => {
    const pkgs = extractPkgs(code, excludePkgs);
    return Promise.all(pkgs.map((pkg) => getPkgLatestVersion(pkg)))
        .then((pkgResults) => {
            const map = {};
            pkgResults.forEach(([pkg, version]) => {
                map[pkg] = version;
            });
            return map;
        })
        .catch((err) => {
            console.log('analyze deps failed, the error is:', err);
        });
};

export default analyzeDeps;