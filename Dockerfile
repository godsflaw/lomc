FROM tclavier/scriptcraft:latest
MAINTAINER Christopher Mooney <chris@dod.net>

ENV MINECRAFT="/opt/minecraft"
ENV SCRIPTCRAFT="${MINECRAFT}/scriptcraft"

# for game data
VOLUME ["/minecraft"]

# drop codebase
RUN mkdir -p ${SCRIPTCRAFT}

# files & directories
ADD start /start
ADD ops.json ${MINECRAFT}/ops.json
ADD server.properties ${MINECRAFT}/server.properties
ADD plugins/EasyFly.jar ${MINECRAFT}/plugins
ADD plugins/NoFireworkDamage.jar ${MINECRAFT}/plugins
ADD scriptcraft/modules/drone/cylinders.js ${SCRIPTCRAFT}/modules/drone/cylinders.js
ADD scriptcraft/modules/dust.js ${SCRIPTCRAFT}/modules/dust.js
ADD scriptcraft/plugins/block.js ${SCRIPTCRAFT}/plugins/block.js
ADD scriptcraft/plugins/drone/contrib/boom.js ${SCRIPTCRAFT}/plugins/drone/contrib/boom.js
ADD scriptcraft/plugins/drone/contrib/mob_grinder.js ${SCRIPTCRAFT}/plugins/drone/contrib/mob_grinder.js
ADD scriptcraft/plugins/drone/contrib/secure_home.js ${SCRIPTCRAFT}/plugins/drone/contrib/secure_home.js
ADD scriptcraft/plugins/drone/contrib/subway.js ${SCRIPTCRAFT}/plugins/drone/contrib/subway.js
ADD scriptcraft/plugins/greet.js ${SCRIPTCRAFT}/plugins/greet.js
ADD scriptcraft/plugins/homes/homes.js ${SCRIPTCRAFT}/plugins/homes/homes.js
ADD scriptcraft/plugins/inv.js ${SCRIPTCRAFT}/plugins/inv.js
ADD scriptcraft/plugins/ravine.js ${SCRIPTCRAFT}/plugins/ravine.js
ADD scriptcraft/plugins/tp_shield.js ${SCRIPTCRAFT}/plugins/tp_shield.js

# run commands after dropping codebase
RUN echo "root:l0mc" | chpasswd

# any ports we want to expose
EXPOSE 25565

# run the tests
WORKDIR "${MINECRAFT}"
CMD ["/start"]
