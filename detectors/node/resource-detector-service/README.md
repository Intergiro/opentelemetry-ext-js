# OpenTelemetry Service Resource Detector for Node.js
[![NPM version](https://img.shields.io/npm/v/opentelemetry-resource-detector-service.svg)](https://www.npmjs.com/package/opentelemetry-resource-detector-service)

This module provides automatic resource detector for [Service](https://github.com/open-telemetry/opentelemetry-specification/tree/main/specification/resource/semantic_conventions#service)

## Installation

```bash
npm install --save opentelemetry-resource-detector-service
```

##  Usage

### Synchronous SDK Initialization
```js
import { detectSyncResources } from '@intergiro/opentelemetry-resource-detector-sync-api';
import { serviceSyncDetector } from '@intergiro/opentelemetry-resource-detector-service';

const resource = detectSyncResources({
    detectors: [serviceSyncDetector, /* add other sync detectors here */],
});
const tracerProvider = new NodeTracerProvider({ resource });
```

### Asynchronous SDK Initialization
```js
import { detectResources } from '@opentelemetry/resources';
import { serviceDetector } from '@intergiro/opentelemetry-resource-detector-service';

( async () => {
    const resource = await detectResources({
        detectors: [serviceDetector, /* add other async detectors here */],
    });
    const tracerProvider = new NodeTracerProvider({ resource });
    // Initialize auto instrumentation plugins and register provider.
    // Make sure you don't 'require' instrumented packages elsewhere 
    // before they are registered here
})();
```

## Attributes
| Attribute | Type | Source |
| --- | --- | --- |
| `service.name` | string | `process.env.OTEL_SERVICE_NAME`. If not set, will try to read `name` attribute from package.json. If not set will fallback to `unknown_service: concatenated with process.executable.name` (according to specification) |
| `serivce.version` | string | `version` attribute from package.json |
| `service.instance.id` | [string (v4 UUID)](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_(random)) | Automatically generated by the detector for each invocation of the service |
