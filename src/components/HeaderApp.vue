<script>

export default{
    name:'HeaderApp',

}

</script>

<template>

    <header>
        
        <nav class="container">

            <div class="nav-links">

                <!-- Logo con link -->
                <router-link :to="'/'">
                    <img src="/logo.svg" alt="Logo Just Bool">
                </router-link>
                
                <!-- Link Login Admin -->

                <div>
                    <a href="http://127.0.0.1:8000/admin" target=”_blank” class="login_btn">
                        <i class="fa-solid fa-user"></i>
                        <span>Login</span>
                    </a>
                </div>
                

            </div>
            
        </nav>
        
    </header>
    
</template>

<style lang="scss" scoped>

header {

    width: 100%;
    height: 80px;
    background-color: white;

    nav {
        display: flex;
        align-items: center;

        margin: 0px auto;

        height: 100%;

        .nav-links {
            display: flex;
            justify-content: space-between;
            align-items: center;

            width: 100%;
            height: 100%;

            img {
                width: 345px;
                height: auto;
            }

            .login_btn {
                padding: 14px 24px 14px 24px;

                cursor: pointer;

                border: none;
                border-radius: 8px;

                box-shadow: 0px 3px 6px rgba(242, 173, 60, 0.5);

                text-decoration: none;
                background-color: white;

                i {
                    color: #FFB30E;
                    padding-right: 10px;
                }
                
                span {
                    color: #FFB30E;
                    font-weight: bold;
                    font-size: 18px;

                }
            }


        }
    }

}

</style>