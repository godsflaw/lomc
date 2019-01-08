#!/bin/bash
echo ECS_CLUSTER=lomc > /etc/ecs/ecs.config

INSTANCE=$(curl -s http://169.254.169.254/latest/meta-data/instance-id)

hostname $INSTANCE
sed -i.bak "s/\\(HOSTNAME=\\).*/\\1$INSTANCE/" /etc/sysconfig/network

# https://aws.amazon.com/blogs/compute/using-amazon-efs-to-persist-data-from-amazon-ecs-containers/
yum -y install jq

if ! rpm -qa | grep -qw nfs-utils; then
    yum -y install nfs-utils
fi

if ! rpm -qa | grep -qw python27; then
  yum -y install python27
fi

yum -y install python27-pip

pip install awscli

EC2_AVAIL_ZONE=`curl -s http://169.254.169.254/latest/meta-data/placement/availability-zone`
EC2_REGION="`echo \"$EC2_AVAIL_ZONE\" | sed -e 's:\([0-9][0-9]*\)[a-z]*\$:\\1:'`"
EFS_NAME=lomc
EFS_FILE_SYSTEM_ID=`/usr/local/bin/aws efs describe-file-systems --region $EC2_REGION | jq '.FileSystems[]' | jq "select(.Name==\"${EFS_NAME}\")" | jq -r '.FileSystemId'`
DIR_SRC=$EC2_AVAIL_ZONE.$EFS_FILE_SYSTEM_ID.efs.$EC2_REGION.amazonaws.com
DIR_TGT=/mnt/efs

mkdir -p ${DIR_TGT}
chown 9999:9999 ${DIR_TGT}
mount -t nfs4 $DIR_SRC:/ $DIR_TGT
cp -p /etc/fstab /etc/fstab.back-$(date +%F)
echo -e "$DIR_SRC:/ \t\t $DIR_TGT \t\t nfs \t\t defaults \t\t 0 \t\t 0" | tee -a /etc/fstab
