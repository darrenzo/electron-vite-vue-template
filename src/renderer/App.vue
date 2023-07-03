<template>
    <div>aaaaaa</div>
    <div>
        <span
            aa="1"
            bb="2"
        />
    </div>
</template>

<script setup lang="ts"></script>

<style lang="less">
.flex() {
    display: flex;
    align-items: center;
}

.flex-a {
    .flex();
}

img {
    width: 40px;
}
</style>
