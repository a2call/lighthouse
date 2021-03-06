"use strict";
/**
Copyright (c) 2015 The Chromium Authors. All rights reserved.
Use of this source code is governed by a BSD-style license that can be
found in the LICENSE file.
**/

require("./chrome_process_helper.js");

'use strict';

/**
 * @fileoverview Utilities for accessing the Chrome GPU Process.
 */
global.tr.exportTo('tr.model.helpers', function () {
  function ChromeGpuHelper(modelHelper, process) {
    tr.model.helpers.ChromeProcessHelper.call(this, modelHelper, process);
    this.mainThread_ = process.findAtMostOneThreadNamed('CrGpuMain');
    if (!process.name) process.name = ChromeGpuHelper.PROCESS_NAME;
  };

  ChromeGpuHelper.PROCESS_NAME = 'GPU Process';

  ChromeGpuHelper.isGpuProcess = function (process) {
    // In some android builds the GPU thread is not in a separate process.
    if (process.findAtMostOneThreadNamed('CrBrowserMain') || process.findAtMostOneThreadNamed('CrRendererMain')) return false;
    return process.findAtMostOneThreadNamed('CrGpuMain');
  };

  ChromeGpuHelper.prototype = {
    __proto__: tr.model.helpers.ChromeProcessHelper.prototype,

    get mainThread() {
      return this.mainThread_;
    }
  };

  return {
    ChromeGpuHelper: ChromeGpuHelper
  };
});