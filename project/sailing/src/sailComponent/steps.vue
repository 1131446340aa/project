<template>
  <a-steps>
    <a-step status="finish" title="Login">
      <a-icon slot="icon" type="user" />
    </a-step>
    <a-step status="finish" title="Verification">
      <a-icon slot="icon" type="solution" />
    </a-step>
    <a-step status="process" title="Pay">
      <a-icon slot="icon" type="loading" />
    </a-step>
    <a-step status="wait" title="Done">
      <a-icon slot="icon" type="smile-o" />
    </a-step>
  </a-steps>
</template>
