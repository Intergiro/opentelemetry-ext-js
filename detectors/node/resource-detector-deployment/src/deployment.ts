import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { Resource } from '@opentelemetry/resources';
import { SyncDetector, syncDetectorToDetector } from '@intergiro/opentelemetry-resource-detector-sync-api';

class DeploymentSyncDetector implements SyncDetector {
    detect(): Resource {
        if (process.env.NODE_ENV) {
            return new Resource({
                [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: process.env.NODE_ENV,
            });
        } else {
            return Resource.empty();
        }
    }
}

export const deploymentSyncDetector = new DeploymentSyncDetector();
export const deploymentDetector = syncDetectorToDetector(deploymentSyncDetector);
