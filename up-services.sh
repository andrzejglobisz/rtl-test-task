# Script runs services in 'PROD' mode by default
# Available parameters are:
# --mode <mode-name> - starts all services in 'DEV', 'QA' or 'PROD' mode
# --service-name <service-name> - starts specific service with its dependencies
# --down-only - stops and removes containers of running services
# --logs-only - displays logs output for all services or only for service specified by '--service-name' parameter
# --re-pull - pulls fresh images before starting containers

UNKNOWN_POSITIONAL_PARAMS=()

SERVICES=(
    "nginx"
    "services/scrapper-svc"
    "services/movies-api"
)

function getDockerComposeOverrideFiles() {
    local mode=${1:-prod}
    local override_files=""

    for service in "${SERVICES[@]}"; do
        if [ ${mode} != "prod" ]; then
            override_files+=\ -f\ ${service}/docker-compose.${mode}.yml
        fi
    done

    printf "%s" "${override_files}"
}

while [ "$#" -gt 0 ]; do
    key="$1"

    case $key in
        --mode)
            MODE="$2"
            shift # past parameter
            shift # past value

            if [ -z "${MODE-false}" ]; then
                printf '%s\n' "Value for '--mode' parameter is required!"
                printf '%s\n' "Available modes are 'DEV', 'QA' or 'PROD'"

                exit 1
            fi
            ;;
        --service-name)
            SERVICE_NAME="$2"
            shift # past parameter
            shift # past value

            if [ -z "${SERVICE_NAME-false}" ]; then
                printf '%s\n' "Value for '--service-name' parameter is required!"

                exit 1
            fi
            ;;
        --down-only)
            DOWN="$1"
            shift # past parameter
            ;;
        --logs-only)
            LOGS="$1"
            shift # past parameter
            ;;
        --re-pull)
            RE_PULL="$1"
            shift # past parameter
            ;;
        *)    # unknown option
            UNKNOWN_POSITIONAL_PARAMS+=("$1")
            shift # past parameter
            ;;
    esac
done

if [ "${#UNKNOWN_POSITIONAL_PARAMS[@]}" -ne 0 ]; then
    printf '%s\n' "Unrecognized parameters: '${UNKNOWN_POSITIONAL_PARAMS[*]}'"
    printf '%s\n' "Available parameters are:"
    printf '%s\n' "--mode <mode-name> - starts all services in 'DEV', 'QA' or 'PROD' mode"
    printf '%s\n' "--service-name <service-name> - specifies service that should be started or for which logs should be displayed"
    printf '%s\n' "--down-only - stops and removes containers of running services"
    printf '%s\n' "--logs-only - displays logs output for all services or only for service specified by '--service-name' parameter"
    printf '%s\n' "--re-pull - pulls fresh images before starting containers"

    exit 0
fi

DOCKER_COMPOSE_CONFIG="docker-compose -f docker-compose.yml"
DOCKER_COMPOSE_UP_OPTIONS=""

case $MODE in
    DEV)
        printf '%s\n' "Mode: ${MODE}"

        DOCKER_COMPOSE_CONFIG+=$(getDockerComposeOverrideFiles dev)
        DOCKER_COMPOSE_UP_OPTIONS="--build --force-recreate"
        ;;
    QA)
        printf '%s\n' "Mode: ${MODE}"

        DOCKER_COMPOSE_CONFIG+=$(getDockerComposeOverrideFiles qa)
        DOCKER_COMPOSE_UP_OPTIONS="--force-recreate -d"
        ;;
    PROD | *)
        printf '%s\n' "Mode: PROD"

        DOCKER_COMPOSE_CONFIG+=$(getDockerComposeOverrideFiles)
        DOCKER_COMPOSE_UP_OPTIONS="--force-recreate -d"
        ;;
esac

DOCKER_COMPOSE_DOWN=("${DOCKER_COMPOSE_CONFIG}" "down --remove-orphans")

if [ "${DOWN}" == "--down-only" ]; then
    printf '%s\n' "Stopping containers, removing containers and networks ..."
    printf '%s\n' "Running command: ${DOCKER_COMPOSE_DOWN[*]}"

    eval "${DOCKER_COMPOSE_DOWN[@]}"

    exit 0;
fi

DOCKER_COMPOSE_LOGS=("${DOCKER_COMPOSE_CONFIG}" "logs --no-color" "${SERVICE_NAME}")

if [ "${LOGS}" == "--logs-only" ]; then
    printf '%s\n' "Displaying logs output ..."
    printf '%s\n' "Running command: ${DOCKER_COMPOSE_LOGS[*]}"

    eval "${DOCKER_COMPOSE_LOGS[@]}"

    exit 0;
fi

DOCKER_COMPOSE_UP=("${DOCKER_COMPOSE_CONFIG}" "up" "${DOCKER_COMPOSE_UP_OPTIONS}")

DOCKER_COMPOSE=(
    "${DOCKER_COMPOSE_DOWN[@]}" "&&"
    "${DOCKER_COMPOSE_UP[@]}"
)

DOCKER_COMPOSE_PULL=("${DOCKER_COMPOSE_CONFIG}" "pull")

if [ "${RE_PULL}" == "--re-pull" ]; then
    printf '%s\n' "Enforced pull of fresh images ..."

    DOCKER_COMPOSE=("${DOCKER_COMPOSE[@]:0:3}" "${DOCKER_COMPOSE_PULL[@]}" "&&" "${DOCKER_COMPOSE[@]:3}")
fi

if [ "${SERVICE_NAME:=false}" != "false" ]; then
    printf '%s\n' "Starting service: ${SERVICE_NAME} ..."

    DOCKER_COMPOSE=("${DOCKER_COMPOSE[@]}" "${SERVICE_NAME}")
else
    printf '%s\n' "Starting all services ..."
fi

printf '%s\n' "Running command: ${DOCKER_COMPOSE[*]}"

eval "${DOCKER_COMPOSE[@]}"
